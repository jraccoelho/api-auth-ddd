import { Password } from '@domain/valueObjects/Password';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import {uuid} from 'uuidv4';

@Entity({
    name: "tb_user",
    database: "user_db"
})
export class User {
    @Column({
        name: "user_id",
        type: "varchar",
        length: 36,
        nullable: false
    })
    @PrimaryColumn()
    public readonly id: string;

    @Column({
        name: "user_login_name",
        type: "varchar",
        length: 20,
        nullable: false
    })
    public loginName: string;

    @Column({
        name:"user_password",
        type: "varchar",
        length: 36,
        nullable: false
    })
    public password: string;

    @Column({
        name: "user_given_name",
        type: "varchar",
        length: 40,
        nullable: false
    })
    public givenName: string;

    @Column({
        name: "user_email",
        type: "varchar",
        length: 40,
        nullable: false
    })
    public email: string;

    @Column({
        name: "user_cell_phone",
        type: "varchar",
        length: 20,
        nullable: true
    })
    public cellphone: string;

    @Column({
        name: "user_personal_document",
        type: "varchar",
        length: 14
    })
    public personalDocument: string;

    @Column({
        name: "user_created_at",
        type: "date"
    })
    public createdAt: Date;

    @Column({
        name: "user_last_update_at",
        type: "date"
    })
    public lastUpdatedAt: Date;

    @Column({
        name: "user_last_auth",
        type:"date"
    })
    public lastAuth: Date;

    @Column({
        name: "user_last_reset_password_at",
        type:"date"
    })
    public lastResetPasswordAt: Date;

    @Column({
        name: "user_last_mfa_code_set_at",
        type:"date"
    })
    public lastMfaCodeSetAt: Date;

    @Column({
        name: "user_last_date_auth_changed_at",
        type:"date"
    })
    public lastDataAuthChangedAt: Date;

    constructor(props: Omit<User, 'id'>, id?: string) {

        this.loginName = props.loginName;
        this.givenName = props.givenName;
        this.personalDocument = props.personalDocument;
        this.email = props.email;
        this.cellphone = props.cellphone;
        this.password = new Password(props.password).retPwd;
        this.createdAt = new Date();

        if(!id) {
            this.id = uuid();
        } else {
            this.id = id;
        }
    }

    public instantAuth(): void {
        this.lastAuth = new Date();
    }

    public instantUpdate(): void {
        this.lastUpdatedAt = new Date();
    }

    public instantResetPassword(): void {
        this.lastResetPasswordAt = new Date();
    }

    public instantMfaChange(): void {
        this.lastMfaCodeSetAt = new Date();
    }

    public instantChangeAuthData(): void {
        this.lastDataAuthChangedAt = new Date();
    }
}