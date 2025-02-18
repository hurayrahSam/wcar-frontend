import { ArticleCategory, ArticleStatus } from '../../enums/article.enum';
import { MeLiked } from '../like/like';
import { Member, TotalCounter } from '../member/member';
export interface Article {
	_id: string;
	articleCategory: ArticleCategory;
	articleStatus: ArticleStatus;
	articleTitle: string;
	articleContent: string;
	articleImage: string;
	articleViews: number;
	articleLikes: number;
	articleComments: number;
	memberId: string;
	createdAt: Date;
	updatedAt: Date;
	creatorData?: Member;
	meLiked?: MeLiked[];
}

export interface Articles {
	list: Article[];
	metaCounter: TotalCounter[];
}
