import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth-service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        AuthService
      ]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('doit récupérer un utilisateur', () => {
    const mockUser = {id: 1,
                      firstName: 'Céline',
                      lastName: 'Test',
                      email: 'cece@frameElement.fr',
                      role: 'USER'
  };

    localStorage.setItem('user', JSON.stringify(mockUser));

    const result = service.getUser();

    expect(result).toEqual(mockUser);
  })

});
