from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.metrics import classification_report
from sklearn.model_selection import train_test_split
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