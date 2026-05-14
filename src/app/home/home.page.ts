import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { BookingService, Booking } from '../../core/services/booking.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  user: string | null = null;
  isLoggedIn: boolean = false;
  bookings: Booking[] = [];
  filteredBookings: Booking[] = [];

  // Filtros
  bookingIdFilter: string = '';
  priceMinFilter: number | null = null;
  priceMaxFilter: number | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private bookingService: BookingService,
  ) {}

  ngOnInit() {
    this.user = localStorage.getItem('user');
    this.isLoggedIn = this.authService.isLoggedIn();
    this.loadBookings();
  }

  loadBookings() {
    this.bookingService.getBookings().subscribe(
      (data) => {
        this.bookings = data;
        this.applyFilters();
      },
      (error) => {
        console.error('Error cargando bookings:', error);
      },
    );
  }

  applyFilters() {
    this.filteredBookings = this.bookingService.filterBookings(
      this.bookings,
      this.bookingIdFilter,
      this.priceMinFilter,
      this.priceMaxFilter,
    );
  }

  onFilterChange() {
    this.applyFilters();
  }

  clearFilters() {
    this.bookingIdFilter = '';
    this.priceMinFilter = null;
    this.priceMaxFilter = null;
    this.applyFilters();
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
