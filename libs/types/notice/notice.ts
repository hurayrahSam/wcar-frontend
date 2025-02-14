import { NoticeCategory, NoticeGroup, NoticeStatus } from "../../enums/notice.enum";
import { TotalCounter } from "../member/member";



export interface Notice {
    _id: string;
    noticeCategory: NoticeCategory;
    noticeStatus: NoticeStatus;
    noticeGroup: NoticeGroup;
    noticeTitle: string;
    noticeContent: string;
    memberId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Notices {
    list: Notice[];
    metaCounter: TotalCounter[];
}