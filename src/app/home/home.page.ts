import { Component, ElementRef, ViewChild } from '@angular/core';
import { CapacitorGoogleMaps } from '@capacitor-community/capacitor-googlemaps-native';
import { Geolocation } from '@capacitor/geolocation';

interface MapData {
  latitude: number;
  longitude: number;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor() {}

  @ViewChild('map') mapView: ElementRef;

  async ionViewDidEnter() {
    const boundingRect =
      this.mapView.nativeElement.getBoundingClientRect() as DOMRect;

    const coordinates = await Geolocation.getCurrentPosition();

    const data: MapData = {
      latitude: coordinates.coords.latitude,
      longitude: coordinates.coords.longitude,
    };

    CapacitorGoogleMaps.create({
      width: Math.round(boundingRect.width),
      height: Math.round(boundingRect.height),
      x: Math.round(boundingRect.x),
      y: Math.round(boundingRect.y),

      latitude: data.latitude,
      longitude: data.longitude,
      zoom: 12,
    });

    CapacitorGoogleMaps.addListener('onMapReady', async function () {
      CapacitorGoogleMaps.addMarker({
        latitude: data.latitude,
        longitude: data.longitude,
        title: 'Emergency',
        snippet: 'severe trouble',
      });

      CapacitorGoogleMaps.setMapType({
        type: 'normal',
      });
    });

    console.log(data.latitude, '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  }

  ionViewDidLeave() {
    CapacitorGoogleMaps.close();
  }
}
