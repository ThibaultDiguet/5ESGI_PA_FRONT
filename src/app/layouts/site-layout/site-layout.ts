import {Component, inject, OnInit} from '@angular/core';
import {Navbar} from "../../shared/components/site/navbar/navbar";
import {ActivatedRoute, RouterOutlet} from "@angular/router";
import {RestaurantService} from '../../core/services/restaurant';
import {RestaurantConfig} from '../../core/types/restaurant';
import {RestaurantConfigContext} from '../../features/site/services/restaurant-config-context';

@Component({
  selector: 'app-site-layout',
  imports: [
    Navbar,
    RouterOutlet
  ],
  providers: [RestaurantConfigContext],
  templateUrl: './site-layout.html'
})
export class SiteLayout implements OnInit {
  restaurantConfig: RestaurantConfigContext;
  restaurant_uri!: string;
  route : ActivatedRoute;
  restaurantService : RestaurantService;
  isFetchingConfig : boolean;

  constructor() {
    this.restaurantConfig = inject(RestaurantConfigContext);
    this.route = inject(ActivatedRoute);
    this.restaurantService = inject(RestaurantService);
    this.isFetchingConfig = true;
  }

  ngOnInit(): void {
    this.restaurant_uri = this.route.snapshot.paramMap.get('restaurant_uri')!;
    if (this.restaurant_uri?.length > 0){
      this.restaurantService.getByUri(this.restaurant_uri).subscribe({
        next: (config) => {
          this.restaurantConfig.setConfig(config as RestaurantConfig);
          this.isFetchingConfig = false;
        },
      });
    }
  }
}
