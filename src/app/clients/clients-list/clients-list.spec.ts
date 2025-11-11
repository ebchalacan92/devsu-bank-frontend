import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ClientsList } from './clients-list';
import { ClientsService } from '../../services/clients';

describe('ClientsList Component', () => {
  let component: ClientsList;
  let mockClientsService: jest.Mocked<ClientsService>;
  let mockRouter: jest.Mocked<Router>;

  const fakeClients = [
    { clientId: 1, name: 'Juan Pérez', address: 'Quito', phone: '555-123', password: 'abc', status: true },
    { clientId: 2, name: 'Ana Gómez', address: 'Guayaquil', phone: '555-456', password: 'def', status: false },
  ];

  beforeEach(() => {
    mockClientsService = {
      getAll: jest.fn().mockReturnValue(of(fakeClients)),
      delete: jest.fn().mockReturnValue(of(void 0)),
    } as any;

    mockRouter = { navigate: jest.fn() } as any;

    TestBed.configureTestingModule({
      providers: [
        { provide: ClientsService, useValue: mockClientsService },
        { provide: Router, useValue: mockRouter },
      ],
    });

    component = new ClientsList(mockClientsService, mockRouter);
  });

  it('debe cargar los clientes correctamente', () => {
    component.ngOnInit();
    expect(mockClientsService.getAll).toHaveBeenCalled();
    expect(component.clients.length).toBe(2);
    expect(component.filteredClients[0].name).toBe('Juan Pérez');
  });

  it('debe filtrar clientes por nombre', () => {
    component.clients = fakeClients;
    component.searchText = 'ana';
    component.filterClients();
    expect(component.filteredClients.length).toBe(1);
    expect(component.filteredClients[0].name).toBe('Ana Gómez');
  });

  it('debe eliminar un cliente correctamente', () => {
    component.selectedClientId = 1;
    component.confirmDelete();
    expect(mockClientsService.delete).toHaveBeenCalledWith(1);
  });

  it('debe navegar al formulario de creación', () => {
    component.goToCreate();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/clientes/new']);
  });
});
