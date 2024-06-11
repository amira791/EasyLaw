from django.core.management.base import BaseCommand
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split
from Data_Collection.models import JuridicalText ,IntrestDomain
import pandas as pd

def get_text_clf():
    # Load the data from the CSV file
    dataset = pd.read_csv(r'C:\Users\Amatek\Documents\juridical_texts_grouped.csv')
    dataset.fillna('', inplace=True)

    # Split the dataset into features (X) and labels (y)
    X = dataset['description']
    y = dataset['grouped_class']

    # Split the dataset into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

    # Define the text classification pipeline with Logistic Regression classifier
    text_clf = Pipeline([
        ('tfidf', TfidfVectorizer(max_df=0.75, ngram_range=(1, 2))),  # TfidfVectorizer with provided parameters
        ('clf', LogisticRegression(C=10))  # Logistic Regression classifier with provided parameter C
    ])

    # Train the model
    text_clf.fit(X_train, y_train)

    return text_clf

class Command(BaseCommand):
    help = 'Classify juridical texts based on their descriptions'

    def handle(self, *args, **kwargs):
        # Extraire les descriptions des textes juridiques depuis la base de données
        juridical_texts = JuridicalText.objects.all().values('id_text', 'description')
        df = pd.DataFrame(list(juridical_texts))
        print(df.head())

        text_clf = get_text_clf()

        # Effectuer la classification sur les données extraites
        df['predicted_class'] = text_clf.predict(df['description'].fillna(''))
        print(df.head())  # Visualiser les résultats avec les classes prédites
        for index, row in df.iterrows():
            id_text = row['id_text']
            print(id_text)
            predicted_class = row['predicted_class']
            print( predicted_class)
            # Récupérer ou créer le domaine d'intérêt correspondant à la classe prédite
            interest, created = IntrestDomain.objects.get_or_create(name=predicted_class)

            # Mettre à jour le texte juridique avec la clé étrangère interest
            JuridicalText.objects.filter(id_text=id_text).update(intrest=interest)
