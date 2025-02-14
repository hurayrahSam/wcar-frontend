import { CommentGroup, CommentStatus } from '../../enums/comment.enum';
import { MeLiked, TotalCounter } from '../property/property';
import { Member } from '../member/member';

export interface Comment {
	_id: string;
	commentStatus: CommentStatus;
	commentGroup: CommentGroup;
	commentContent: string;
	commentRefId: string;
	memberId: string;
	createdAt: Date;
	updatedAt: Date;
	meLiked?: MeLiked[];
	creatorData?: Member;
}

export interface Comments {
	list: Comment[];
	metaCounter: TotalCounter[];
}
