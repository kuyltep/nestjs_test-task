import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('crypto-coin')
export class CryptoCoinEntity {
  @Column()
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column('decimal')
  price: number;
}
