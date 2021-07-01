Migrations:

* Install YARN (npm i -g yarn)
* criar arquivo migrations
    yarn sequelize migration:create --name=create-users

* Executar migrations
    yarn sequelize db:migrate

* Desfazer ultima migration
    yarn sequelize db:migrate:undo