# Plateforme Juridique
## Table des matières
1. [Configuration Frontend](#configuration-frontend)
2. [Configuration Backend](#configuration-backend)
3. [Configuration Base de Données](#configuration-base-de-données)
4. [Configuration Elasticsearch](#configuration-elasticsearch)
5. [Configuration Web Scraping](#configuration-web-scraping)

---

## Configuration Frontend

Dans le répertoire du projet, vous pouvez exécuter :

1. Démarrer le serveur frontend :
    ```sh
    npm start
    ```

2. Installer les routers :
    ```sh
    npm install react-router-dom
    ```

3. Installer les icônes :
    ```sh
    npm install @mui/icons-material
    ```

---

## Configuration Backend

Dans le serveur (backend), exécutez les commandes suivantes :

1. Créer un environnement virtuel :
    ```sh
    python3 -m venv venv
    ```

2. Activer l'environnement virtuel :
    ```sh
    .\venv\Scripts\Activate
    ```

3. Installer les dépendances :
    ```sh
    pip install -r requirements.txt
    ```

4. Démarrer le serveur Django :
    ```sh
    python manage.py runserver
    ```

5. Une fois terminé, désactiver l'environnement virtuel :
    ```sh
    deactivate
    ```

### Ports

- Client : `3000`
- Serveur : `8000`

---

## Configuration Base de Données

1. Installer le client MySQL :
    ```sh
    pip install mysqlclient
    ```

2. Installer dotenv :
    ```sh
    pip install python-dotenv
    ```

3. Ouvrir MySQL Client et définir votre mot de passe sur `1234`.

4. Créer la base de données `lawdata` :
    ```sql
    CREATE DATABASE lawdata;
    ```

5. Appliquer les migrations :
    ```sh
    python manage.py makemigrations
    python manage.py migrate
    ```

6. Appliquer les migrations pour l'application `User` :
    ```sh
    python manage.py makemigrations User
    python manage.py migrate
    ```

7. Vérifier les changements dans la base de données MySQL :
    ```sql
    SHOW DATABASES;
    ```

---

## Configuration Elasticsearch

1. Télécharger Elasticsearch :
    - [elasticsearch-8.13.0-windows-x86_64.zip](https://www.elastic.co/downloads/elasticsearch)
    
2. Dézipper le fichier et ajouter le chemin de `bin` dans la variable d'environnement `PATH`.

3. Modifier le fichier de configuration des rôles dans le dossier `config` :

    ```yml
    admins:
      cluster:
        - all
      indices:
        - names:
            - "*"
          privileges:
            - all
    devs:
      cluster:
        - manage
      indices:
        - names:
            - "*"
          privileges:
            - write
            - delete
            - create_index
    ```

4. Ajouter un utilisateur Elasticsearch :
    ```sh
    elasticsearch-users useradd nomuser -p mdp
    ```

5. Ajouter l'utilisateur dans `user roles.yml` :
    ```yml
    admins: your_user_name
    ```

6. Modifier `elasticsearch.yml` :
    ```yml
    enabled: true
    enabled: false
    ```

7. Vérifier l'installation :
    ```sh
    elasticsearch
    ```

8. Ajouter dans `settings.py` :

    ```python
    INSTALLED_APPS = [
        ...
        'django_elasticsearch_dsl',
    ]

    ELASTICSEARCH_DSL = {
        'default': {
            'hosts': 'http://localhost:9200',
            'timeout': 60,  # Custom timeout
            'http_auth': ('votre user name', 'votre mdp')
        }
    }

    ELASTIC_HOST = 'http://localhost:9200/'

    from elasticsearch import Elasticsearch

    client = Elasticsearch(
        [ELASTIC_HOST],
        basic_auth=('username', 'mot de passe')
    )
    ```

9. Dans l'environnement de projet, installer les packages :

    ```sh
    pip install elasticsearch
    pip install elasticsearch-dsl
    pip install django-elasticsearch-dsl
    ```

10. Rebuilder les indexes après chaque modification :
    ```sh
    python manage.py search_index --rebuild -f --settings=settings
    ```

---

## Configuration Web Scraping

1. Installer Requests :
    ```sh
    pip install requests
    ```

2. Installer BeautifulSoup :
    ```sh
    pip install beautifulsoup4
    ```

3. Installer lxml :
    ```sh
    pip install lxml
    ```

4. Installer Scrapy :
    ```sh
    pip install scrapy
    ```

5. Installer Selenium :
    ```sh
    pip install selenium
    ```

6. Installer Pandas :
    ```sh
    pip install pandas
    ```

7. Installer Fake Useragent :
    ```sh
    pip install fake-useragent
    ```

8. Installer Pyppeteer :
    ```sh
    pip install pyppeteer
    ```

---


