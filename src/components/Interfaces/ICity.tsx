import IPointOfInterest from "./IPointOfInterest"

interface ICity {
    id: number
    name: string
    description: string
    country: string
    imageUrl: string;
    pointsOfInterest?: IPointOfInterest[];
}

export default ICity
