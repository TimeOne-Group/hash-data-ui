# Hash Data UI

Interface de hachage des données en MD5 ou SHA256 d'un fichier CSV pour la déduplication emailing TimeOne.

Le chargement et le hachage des données sont réalisés par le navigateur. Aucune donnée n'est donc transmise à un serveur. Elle reste localement sur votre ordinateur. 

## Copyright

- Favicon : https://remixicon.com/

## Disclaimer

La fonction de hashage MD5 a été conservée dans ce projet MAIS il est déconseillé de l'utiliser.
Elle est jugée obsolète comme la fonction SHA1.

Nous vous conseillons donc d'utiliser uniquement la fonction de hashage SHA256 sur ce projet.

## Développement

### Prérequis

Pour développer sur le projet il vous faut:

-   docker
-   docker-compose
-   git
-   git-flow

### Les branches

- Branch name for production releases : `master`
- Branch name for "next release" development : `develop`
### Initialisation du projet


```bash
git clone https://github.com/TimeOne-Group/hash-data-ui.git
cd hash-data-ui
git flow init
docker-compose run --rm app npm i
```

### IDE

Si vous utilisez Visual Code Studio
```bash
bash .dev/scripts/setup.sh
```

### Lancement du projet

```bash
docker-compose up
```

### Lancement des tests

```bash
docker-compose run --rm app npm run test
```
