import { AuthType, Brand, CarServiceType, Location, Status, Type } from "../../enums/member.enum";

export interface MemberUpdate {
    _id: string;
    type?: Type;
    status?: Status;
    authType?: AuthType;
    titleNick?: string;
    password?: string;
    fullName?: string;
    image?: string;
    viewImage?: string;
    address?: string;
    shortDesc?: string;
    longDesc?: string;
    phone?: string;
    phone2?: string;
    email?: string;
    kakaoTalk?: string;
    youtube?: string;
    instagram?: string;
    facebook?: string;
    tikTok?: string;
    naverBlog?: string;
    xcom?: string;
    sellerProducts?: number;
    dealerFinancing?: boolean;
    dealerCarService?: boolean;
    dealerTradeIn?: boolean;
    dealerCustomization?: boolean;
    dealerWarranties?: boolean;
    dealerParts?: boolean;
    dealerAccessories?: boolean;
    dealerCarDetailing?: boolean;
    dealerCarWash?: boolean;
    dealerCarTestDrive?: boolean;
    dealerCarDelivery?: boolean;
    carOilChange?: boolean;
    carAlignment?: boolean;
    carTireChange?: boolean;
    carBrakeCheck?: boolean;
    carBatteryCheck?: boolean;
    carTireBalance?: boolean;
    carSuspension?: boolean;
    carAirCondition?: boolean;
    carTransmissionCheck?: boolean;
    carEngineDiagnostic?: boolean;
    carExhaust?: boolean;
    carDetailing?: boolean;
    carWindshield?: boolean;
    carTimingBelt?: boolean;
    carChainReplacement?: boolean;
    openAt?: string;
    closeAt?: string;
    openSunday?: string;
    closeSunday?: string;
    openSaturday?: string;
    closeSaturday?: string;
    publicHolidays?: boolean;
    deletedAt?: Date;
}