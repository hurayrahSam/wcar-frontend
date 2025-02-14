import { CarBody, CarBrand, CarColor, CarDriveType, CarFuelType, CarGroup, CarLocation, CarMadeIn, CarStatus, CarTransmission, CarType } from "../../enums/car.enum";
import { MeLiked } from "../like/like";
import { Member, TotalCounter } from "../member/member";
import { MeSaved } from "../save/save";

export interface Car {
    _id: string;
    carType: CarType;
    carTitle: string;
    carBody: CarBody;
    carStatus: CarStatus;
    carGroup: CarGroup;
    carMadeIn: CarMadeIn;
    carBrand: CarBrand;
    carModel: string;
    carPrice: number;
    carImages: string[];
    carVideo?: string;
    carLocation: CarLocation;
    carAddress: string;
    carDesc?: string
    carBarter: boolean;
    carRent: boolean;
    carYear: number;
    carMileage: number;
    carFuelType: CarFuelType;
    carDriveType: CarDriveType;
    carTransmission: CarTransmission;
    carEngineSize: string;
    carColor: CarColor;
    carFullFuel: string;
    carMpgHw: number;
    carMpgCity: number;
    carDoor?: string;
    carCylinders?: string;
    carMaxSpeed?: string;
    carHundredSpeed?: string;
    carHorsePower?: string;
    carTorque?: string;
    carLength?: string;
    carHeigth?: string;
    carWidth?: string;
    carSeatsUp?: string;
    carWeigth?: string;
    carLoadWeight?: string;
    carTireSize?: string;
    carWheelBase?: string;
    carAutoBrake: boolean;
    carCruiseControl: boolean;
    carESC: boolean;
    carAutonomuosDrive: boolean;
    carExteriorLight: boolean;
    carPanoramicSunroof: boolean;
    carHeatedSeats: boolean;
    carCooledSeats: boolean;
    carTouchscreenDisplay: boolean;
    carAutoHeadLight: boolean;
    carStarStop: boolean;
    carNoiseCancellation: boolean;
    carRemoteKeyless: boolean;
    carLaneDW: boolean;
    carBlindSpotMonitoring: boolean;
    carRearCrossTrafficAlert: boolean;
    carApplePlay: boolean;
    carAndroidAuto: boolean;
    carVoiceControl: boolean;
    carBluetoothConnectivity: boolean;
    carWirelessCharging: boolean;
    carParkingAssist: boolean;
    carSurroundViewCamera: boolean;
    carFrontSensors: boolean;
    carRearSensors: boolean;
    carFrontRecordCamera: boolean;
    carRearRecordCamera: boolean;
    carHeadsUpDisplay: boolean;
    carClimateControl: boolean;
    carAdjustableSeats: boolean;
    carMemorySeats: boolean;
    carPowerTrain: boolean;
    carRegenerativeBraking: boolean;
    carTractionControl: boolean;
    carStabilityControl: boolean;
    carHillStartAssist: boolean;
    carTirePressureSystem: boolean;
    carPushButton: boolean;
    carCrush: number;
    carRepair: number;
    carFrontBumper: boolean;
    carBackBumper: boolean;
    carBonnet: boolean;
    carTailgate: boolean;
    carRightFrontWing: boolean;
    carLeftFrontWing: boolean;
    carRightBackWing: boolean;
    carLeftBackWing: boolean;
    carRoof: boolean;
    carRightFrontDoor: boolean;
    carLeftFrontDoor: boolean;
    carRightBackDoor: boolean;
    carLeftBackDoor: boolean;
    carViews: number;
    carLikes: number;
    carSave: number;
    carComments: number;
    carRank: number;
    memberId: string;
    soldAt?: Date;
    deletedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    creatorData?: Member;
    meLiked?: MeLiked[];
    meSaved?: MeSaved[];
}

export interface Cars {
    list: Car[];
    metaCounter: TotalCounter[];
}