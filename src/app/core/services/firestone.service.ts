import { inject, Injectable, signal, computed } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  doc,
  getDocs,
  orderBy,
  limit,
  query,
  startAfter,
  serverTimestamp,
  Timestamp,
  CollectionReference,
  getCountFromServer,
} from '@angular/fire/firestore';
import { Client } from '../models/client.model';
import { LoadingService } from './loading.service';

@Injectable({ providedIn: 'root' })
export class FirestoreService {
  private fs = inject(Firestore);
  private _clients = signal<Client[]>([]);
  private _loading = signal(false);
  private _cursor: any = null;
  private _pageSize = 10;
  private _total = signal(0);
  private loadingSvc = inject(LoadingService);

  clients = this._clients.asReadonly();
  loading = this._loading.asReadonly();
  total = this._total.asReadonly();

  avgAge = computed(() => {
    const list = this._clients();
    if (!list.length) return 0;
    return +(list.reduce((a, c) => a + (c.edad || 0), 0) / list.length).toFixed(2);
  });

  stdDevAge = computed(() => {
    const list = this._clients();
    if (!list.length) return 0;
    const mean = this.avgAge();
    const variance =
      list.reduce((acc, c) => acc + Math.pow((c.edad || 0) - mean, 2), 0) / list.length;
    return +Math.sqrt(variance).toFixed(2);
  });

  private col(): CollectionReference {
    return collection(this.fs, 'clients') as CollectionReference;
  }

  async countAll() {
    const snap = await getCountFromServer(this.col());
    this._total.set(snap.data().count);
  }

  async loadFirstPage() {
    this._loading.set(true);
    this.loadingSvc.isLoading.set(true);
    try {
      const q = query(this.col(), orderBy('createdAt', 'desc'), limit(this._pageSize));
      const snap = await getDocs(q);
      const items: Client[] = [];
      snap.forEach((d) => items.push({ id: d.id, ...(d.data() as any) }));
      this._clients.set(items);
      this._cursor = snap.docs[snap.docs.length - 1] || null;
      await this.countAll();
    } finally {
      this._loading.set(false);
      this.loadingSvc.isLoading.set(false); 
    }
  }

  async loadNextPage() {
    if (!this._cursor) return;
    this._loading.set(true);
    this.loadingSvc.isLoading.set(true); 
    try {
      const q = query(
        this.col(),
        orderBy('createdAt', 'desc'),
        startAfter(this._cursor),
        limit(this._pageSize)
      );
      const snap = await getDocs(q);
      const items = [...this._clients()];
      snap.forEach((d) => items.push({ id: d.id, ...(d.data() as any) }));
      this._clients.set(items);
      this._cursor = snap.docs[snap.docs.length - 1] || null;
    } finally {
      this._loading.set(false);
      this.loadingSvc.isLoading.set(false); 
    }
  }

  async addClient(c: Omit<Client, 'createdAt'>) {
    this.loadingSvc.isLoading.set(true);
    try {
      await addDoc(this.col(), { ...c, createdAt: Date.now() });
      await this.loadFirstPage();
    } finally {
      this.loadingSvc.isLoading.set(false);
    }
  }
}
