import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Booking {
  bookingId: string;
  firstName: string;
  lastName: string;
  bookingTime: string;
  streetAddress: string;
  bookingPrice: number;
}

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private bookings: Booking[] = [
    {
      bookingId: 'BK001',
      firstName: 'Juan',
      lastName: 'Pérez',
      bookingTime: '2026-05-13 10:30',
      streetAddress: 'Calle Principal 123',
      bookingPrice: 50000,
    },
    {
      bookingId: 'BK002',
      firstName: 'María',
      lastName: 'González',
      bookingTime: '2026-05-12 14:15',
      streetAddress: 'Avenida Central 456',
      bookingPrice: 75000,
    },
    {
      bookingId: 'BK003',
      firstName: 'Carlos',
      lastName: 'López',
      bookingTime: '2026-05-11 09:45',
      streetAddress: 'Paseo Norte 789',
      bookingPrice: 35000,
    },
    {
      bookingId: 'BK004',
      firstName: 'Ana',
      lastName: 'Martínez',
      bookingTime: '2026-05-10 16:20',
      streetAddress: 'Boulevard Sur 321',
      bookingPrice: 120000,
    },
    {
      bookingId: 'BK005',
      firstName: 'Roberto',
      lastName: 'Sánchez',
      bookingTime: '2026-05-09 11:00',
      streetAddress: 'Ruta Poniente 654',
      bookingPrice: 45000,
    },
  ];

  constructor() {}

  getBookings(): Observable<Booking[]> {
    return of(this.bookings);
  }

  filterBookings(
    bookings: Booking[],
    bookingIdFilter: string,
    priceMinFilter: number | null,
    priceMaxFilter: number | null,
  ): Booking[] {
    return bookings.filter((booking) => {
      // Filtro por bookingId (like)
      const bookingIdMatch = !bookingIdFilter
        ? true
        : booking.bookingId
            .toLowerCase()
            .includes(bookingIdFilter.toLowerCase());

      // Filtro por precio mínimo (>=)
      const priceMinMatch =
        priceMinFilter === null ? true : booking.bookingPrice >= priceMinFilter;

      // Filtro por precio máximo (<=)
      const priceMaxMatch =
        priceMaxFilter === null ? true : booking.bookingPrice <= priceMaxFilter;

      return bookingIdMatch && priceMinMatch && priceMaxMatch;
    });
  }
}
