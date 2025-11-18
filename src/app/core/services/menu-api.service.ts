import { Injectable, computed, signal } from '@angular/core';
import {MenuItem, WeddingMenu} from '../../model/menu.models';

@Injectable({ providedIn: 'root' })
export class MenuApiService {
  private readonly _menu = signal<WeddingMenu | null>(null);
  private readonly _loading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);

  readonly menu = this._menu.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  readonly meta = computed(() => this._menu()?.meta ?? null);
  readonly groups = computed(() => this._menu()?.groups ?? []);

  private readonly collapsedGroupsNames = signal(new Set<string>());

  public isCollapsed(groupName: string): boolean {
    return this.collapsedGroupsNames().has(groupName);
  }

  public toggleGroup(groupName: string): void {
    this.collapsedGroupsNames.update((prev) => {
      const next = new Set(prev);
      if (next.has(groupName)) {
        next.delete(groupName);
      } else {
        next.add(groupName);
      }
      return next;
    });
  }

  public expandAll(): void {
    this.collapsedGroupsNames.set(new Set());
  }

  public collapseAll(): void {
    this.collapsedGroupsNames.set(new Set(this.groups().map((group) => group.name)));
  }

  /**
   * Loads the wedding menu JSON from a public asset.
   * Place the file at `/wedding_menu_full.json` (public root) or pass a custom URL.
   */
  async load(url: string = 'wedding_menu_full.json', useCache = false): Promise<void> {
    if (useCache && this._menu()) return; // cache: load once
    this._loading.set(true);
    this._error.set(null);
    try {
      const fetchOptions: RequestInit = useCache
        ? { cache: 'force-cache' }
        : { cache: 'no-store' };
      const baseHref = document.querySelector<HTMLBaseElement>('base')?.href ?? window.location.href;
      const resolvedUrl = new URL(url, baseHref).toString();
      console.info('[MenuApi] Loading menu from', resolvedUrl, fetchOptions);
      const res = await fetch(resolvedUrl, fetchOptions);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as WeddingMenu;
      console.info('[MenuApi] Menu loaded successfully', {
        groups: data.groups?.length ?? 0,
        meta: data.meta ?? null
      });
      this._menu.set(data);
    } catch (e: any) {
      console.error('[MenuApi] Failed to load menu', e);
      this._error.set(e?.message ?? 'Failed to load menu');
      this._menu.set(null);
    } finally {
      this._loading.set(false);
    }
  }
}

