import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WhatsappMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  groupsSent: string[];

  @Column()
  message: string;

  @Column()
  deliveredAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
