import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ApiRoute {
  private baseURL = `https://cdn.contentful.com`;
  private spaceID = `lzkpvmwdzwc6`;
  private environmentID = `master`;
  private deliveryToken = `cixMlBKtWoYGrYV6cADwNdAProGI9Fcq1QjBdW9G4QE`;

  space = `${this.baseURL}/spaces/${this.spaceID}?access_token=${this.deliveryToken}`;
  entries = `${this.baseURL}/spaces/${this.spaceID}/environments/${this.environmentID}/entries?access_token=${this.deliveryToken}`;
  assets = `${this.baseURL}/spaces/${this.spaceID}/environments/${this.environmentID}/assets?access_token=${this.deliveryToken}`;
}
