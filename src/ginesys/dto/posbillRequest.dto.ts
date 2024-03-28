import { IsEmail, IsNotEmpty, MinLength, ValidateNested } from "class-validator";

export class UserDTO {
    @IsNotEmpty()
    userName: string;
    
    @IsNotEmpty()
    organizationId: string;

    @IsNotEmpty()
    token: string
}

export class ItemPromotionDTO {
    @IsNotEmpty()
    DiscountType: 'Item';

    @IsNotEmpty()
    ItemCode?: string;

    @IsNotEmpty()
    ItemDiscount?: string;

    @IsNotEmpty()
    QuantityDiscounted?: string;
    
    @IsNotEmpty()
    CouponCode?: string;

    @IsNotEmpty()
    RewardRatio?: string; 

    @IsNotEmpty()
    DiscountAmount?: string;
}

export class ReceiptPromotionDTO {
    @IsNotEmpty()
    DiscountType: 'Receipt';

    @IsNotEmpty()
    DiscountAmount?: string;

    @IsNotEmpty()
    CouponCode?: string;
}

export type PromotionDTO = ItemPromotionDTO | ReceiptPromotionDTO;

export class LoyaltyRedeemDTO {
    @IsNotEmpty()
    DiscountAmount?: string;
}

export class OptcultureDetailsDTO {
    @IsNotEmpty()
    MembershipNumber: string;

    @IsNotEmpty()
    @IsEmail()
    Email: string;

    @IsNotEmpty()
    Phone: string;
    
    @IsNotEmpty()
    LoyaltyRedeem?: LoyaltyRedeemDTO; 

    @IsNotEmpty()
    LoyaltyRedeemReversal?: string;

    @IsNotEmpty()
    @ValidateNested({ each: true})
    @MinLength(1)
    Promotions: PromotionDTO[];
}

  export class PosBillRequestDTO {
    @IsNotEmpty()
    @ValidateNested({ each: true})
    user: UserDTO;

    @IsNotEmpty()
    requestTimestamp: string;

    @IsNotEmpty()
    requestType: string;

    @IsNotEmpty()
    receiptType: string;

    @IsNotEmpty()
    @ValidateNested({ each: true})
    OptcultureDetails: OptcultureDetailsDTO;
}

export class PosBillResponse {
    success: boolean;
    data:PosBillRequestDTO;
}