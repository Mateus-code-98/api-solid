# APP

GymPass style app.

## RFs ( Requisitos Funcionais )

- [x] Deve ser possível cadastrar um novo usuário.
- [x] Deve ser possível se autenticar na aplicação.
- [x] Deve ser possível obter o perfil de um usuário logado.
- [x] Deve ser possível obter o número de check-ins realizados por um usuário logado.
- [x] Deve ser possível o usuário obter uma lista de check-ins realizados por ele.
- [x] Deve ser possível o usuário buscar academias próximas.
- [x] Deve ser possível o usuário buscar academias pelo nome.
- [x] Deve ser possível o usuário realizar check-in em uma academia.
- [ ] Deve ser possível validar o check-in de um usuário.
- [x] Deve ser possível cadastrar uma academia.

## RNs ( Regras de Negócio )

- [x] O usuário não deve poder se cadastrar com um e-mail já existente.
- [x] O usuário não pode fazer 2 check-in no mesmo dia.
- [x] O usuário não pode fazer check-in se não estiver próximo (100m) a uma academia.
- [ ] O check-in só pode ser validado até 20 minutos após a realização do mesmo.
- [ ] O check-in so pode ser validado por administradores.
- [ ] A academia só pode ser cadastrada por administradores.

## RNFs ( Requisitos Não Funcionais )

- [x] A senha do usuário deve ser criptografada.
- [x] Os dados da aplicação devem ser armazenados em um banco de dados relacional PostgreSQL.
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por página.
- [ ] O usuário deve ser autenticado através de um token JWT.
