import { TestBed, inject } from '@angular/core/testing';

import { NotificationService } from './error.service';

describe('NotificationService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [NotificationService]
        });
    });

    it('should be created', inject([NotificationService], (service: NotificationService) => {
        expect(service).toBeTruthy();
    }));
});
