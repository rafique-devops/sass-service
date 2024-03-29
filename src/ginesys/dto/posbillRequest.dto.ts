export class UserDTO {
    userName: string;
    organizationId: string;
    token: string
}

export class ItemPromotionDTO {
    DiscountType: 'Item';
    ItemCode?: string;
    ItemDiscount?: string;
    QuantityDiscounted?: string;
    CouponCode?: string;
    RewardRatio?: string;
}

export class ReceiptPromotionDTO {
    DiscountType: 'Receipt';
    DiscountAmount?: string;
    CouponCode?: string;
}

export type PromotionDTO = ItemPromotionDTO | ReceiptPromotionDTO;

export class LoyaltyRedeemDTO {
    DiscountAmount?: string;
}

export class OptcultureDetailsDTO {
    MembershipNumber: string;
    Email: string;
    Phone: string;
    LoyaltyRedeem?: LoyaltyRedeemDTO; 
    LoyaltyRedeemReversal?: string;
    Promotions: PromotionDTO[];
}

  export class PosBillRequestDTO {
    user: UserDTO;
    requestTimestamp: string;
    requestType: string;
    receiptType: string;
    OptcultureDetails: OptcultureDetailsDTO;
}