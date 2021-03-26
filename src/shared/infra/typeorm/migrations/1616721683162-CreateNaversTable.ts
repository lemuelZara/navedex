import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class CreateNaversTable1616721683162 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'navers',
        columns: [
          new TableColumn({
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          }),
          new TableColumn({
            name: 'user_id',
            type: 'integer',
          }),
          new TableColumn({
            name: 'name',
            type: 'varchar',
          }),
          new TableColumn({
            name: 'birthdate',
            type: 'timestamp',
          }),
          new TableColumn({
            name: 'admission_date',
            type: 'timestamp',
          }),
          new TableColumn({
            name: 'job_role',
            type: 'varchar',
          }),
          new TableColumn({
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          }),
          new TableColumn({
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          }),
        ],
      })
    );

    await queryRunner.createForeignKey(
      'navers',
      new TableForeignKey({
        name: 'fk_navers_users',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropForeignKey('navers', 'fk_navers_users');
    await queryRunner.dropTable('navers');
  }
}
