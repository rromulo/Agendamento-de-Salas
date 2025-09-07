export interface IRoomAmenities {
  hasProjector?: boolean;
  hasWhiteboard?: boolean;
  hasAirConditioning?: boolean;
  capacity: number;
}

export class Room {
  public id: number | null;
  public name: string;
  public description: string;
  public capacity: number;
  public amenities: IRoomAmenities;
  public isActive: boolean;
  public createdAt: Date;
  public updatedAt: Date;

   constructor(
    id: number | null,
    name: string,
    description: string,
    capacity: number,
    amenities: IRoomAmenities
   ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.capacity = capacity;
    this.amenities = amenities;
    this.isActive = true;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  validate(): void {
    if (!this.name || this.capacity <= 0) {
      throw new Error('Invalid room data');
    }
  }

}