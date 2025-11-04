import { MenuStateService } from './menu-state.service';
import { MenuItem } from '../../model/menu.models';

describe('MenuStateService', () => {
  let service: MenuStateService;
  const sample: MenuItem = { name: 'Test', price: '100', weight: '100г' };

  beforeEach(() => {
    service = new MenuStateService();
  });

  it('should add item on increment', () => {
    service.addOrIncrement('Group', sample);
    expect(service.items().length).toBe(1);
    expect(service.totalQuantity()).toBe(1);
  });

  it('should increment existing item', () => {
    service.addOrIncrement('Group', sample);
    service.addOrIncrement('Group', sample);
    expect(service.items()[0].quantity).toBe(2);
  });

  it('should remove item when decremented to zero', () => {
    service.addOrIncrement('Group', sample);
    service.decrement('Group', sample.name);
    expect(service.items().length).toBe(0);
  });

  it('should clear all items', () => {
    service.addOrIncrement('Group', sample);
    service.clear();
    expect(service.items().length).toBe(0);
  });
});

