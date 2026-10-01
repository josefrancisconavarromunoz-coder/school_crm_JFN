export class StorageService<T> {
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  public getAll(): T[] {
    const data = localStorage.getItem(this.key);
    return data ? (JSON.parse(data) as T[]) : [];
  }

  public saveAll(items: T[]): void {
    localStorage.setItem(this.key, JSON.stringify(items));
  }

  public add(item: T): void {
    const items = this.getAll();
    items.push(item);
    this.saveAll(items);
  }
}