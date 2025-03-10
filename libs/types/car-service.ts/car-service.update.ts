import { Status } from "../../enums/member.enum";

export interface CarServiceUpdate {
    _id: string;
    carServiceStatus?: Status;
    carServiceTitle?: string;
    carServicePassword?: number;
    carServiceAddress?: string;
    carServicePhone?: string;
    carServicePhone2?: string;
    carServcieEmail?: string;
    carServiceKakaoTalk?: string;
    carServiceImage?: string;
    carServiceImages?: string[];
    carServiceShortDesc?: string;
    carServiceDesc?: string;
    carServiceOpenAt?: string;
    carServiceCloseAt?: string;
    carServiceWeekendOpenAt?: string;
    carServiceWeekendCloseAt?: string;
    carServicePublicHolidays?: boolean;
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
    carMemberShipBasic?: string;
    carMemberShipStandard?: string;
    carMemberShipPremium?: string;
}