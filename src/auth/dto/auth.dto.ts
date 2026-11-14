import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { UserRole } from "../../generated/prisma/enums.js";

export class LoginAuthDto{
    @ApiProperty({
        example:"John_Doe",
        description:"Username of the user",
    })
    @IsNotEmpty()
    @IsString()
    username:string;
    @ApiProperty({
        example:"John_Doe@123",
        description:"Password of the user",
    })
    @IsNotEmpty()
    @IsString()
    password:string; 
}


export class CreateAuthDto{
    @ApiProperty({example:"John Doe"})
    @IsNotEmpty()
    @IsString()
    fullName:string

    @ApiProperty({example:"Johndoe123"})
    @IsNotEmpty()
    @IsString()
    passwordHash:string

    @ApiProperty({example:"john_doe"})
    @IsNotEmpty()
    @IsString()
    username:string

    @ApiProperty({
        enum:UserRole
    })
    @IsNotEmpty()
    @IsEnum(UserRole)
    role:UserRole

}

