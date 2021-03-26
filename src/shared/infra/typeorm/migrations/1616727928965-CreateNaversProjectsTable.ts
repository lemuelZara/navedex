import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class CreateNaversProjectsTable1616727928965
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'navers_projects',
        columns: [
          new TableColumn({
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          }),
          new TableColumn({
            name: 'naver_id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          }),
          new TableColumn({
            name: 'project_id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          }),
          new TableColumn({
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          }),
        ],
      })
    );

    await queryRunner.createForeignKey(
      'navers_projects',
      new TableForeignKey({
        name: 'fk_navers_projects_navers',
        columnNames: ['naver_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'navers',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      })
    );

    await queryRunner.createForeignKey(
      'navers_projects',
      new TableForeignKey({
        name: 'fk_navers_projects_projects',
        columnNames: ['project_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'projects',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropForeignKey(
      'navers_projects',
      'fk_navers_projects_navers'
    );
    await queryRunner.dropForeignKey(
      'navers_projects',
      'fk_navers_projects_projects'
    );

    await queryRunner.dropTable('navers_projects');
  }
}
