import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class CreateProjectsTable1616721692076 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'projects',
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
      'projects',
      new TableForeignKey({
        name: 'fk_projects_users',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropForeignKey('projects', 'fk_projects_users');
    await queryRunner.dropTable('projects');
  }
}
