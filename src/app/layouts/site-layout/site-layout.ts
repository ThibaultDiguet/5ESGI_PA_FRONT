import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { RestaurantService } from '../../core/services/restaurant';
import { RestaurantConfig } from '../../core/types/restaurant';
import { RestaurantConfigStore } from '../../core/stores/restaurantConfigStore';
import { LoadingState } from '../../shared/components/primitives/loading-state/loading-state';
import { Navbar } from '../../shared/components/site/navbar/navbar';

@Component({
  selector: 'app-site-layout',
  imports: [LoadingState, Navbar, RouterOutlet],
  providers: [RestaurantConfigStore],
  templateUrl: './site-layout.html',
})
export class SiteLayout implements OnInit {
  restaurantConfig: RestaurantConfigStore;
  restaurant_uri!: string;
  route: ActivatedRoute;
  restaurantService: RestaurantService;
  isFetchingConfig: boolean;
  router: Router;

  constructor() {
    this.router = inject(Router);
    this.restaurantConfig = inject(RestaurantConfigStore);
    this.route = inject(ActivatedRoute);
    this.restaurantService = inject(RestaurantService);
    this.isFetchingConfig = true;
  }

  ngOnInit(): void {
    this.restaurant_uri = this.route.snapshot.paramMap.get('restaurant_uri')!;
    if (this.restaurant_uri?.length > 0) {
      this.restaurantService.getByUri(this.restaurant_uri).subscribe({
        next: (config) => {
          this.restaurantConfig.setConfig(config as RestaurantConfig);
          this.isFetchingConfig = false;
        },
        error: (error) => {
          if (error.status === 404) {
            this.router.navigate(['/not-found']);
          }
        },
      });
    }
  }
}
