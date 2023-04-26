import nltk
from string import punctuation
from nltk.corpus import stopwords

nltk.download('stopwords')
nltk.download('punkt')
from nltk.tokenize import word_tokenize
from nltk.tokenize import sent_tokenize


def clean(text):
    sample = text.split('**')
    sample.pop(0)
    clean_text = ""
    i = 0
    for t in sample:
        if i % 2 != 0:
            clean_text += str(t)
        i += 1
    return clean_text


stop_words = set(stopwords.words("english"))


def wordTokenize(text):
    words = word_tokenize(text)
    return words


def generateFreqTable(text):
    freqTable = dict()
    words = wordTokenize(text)
    for word in words:
        word = word.lower()
        if word in stop_words:
            continue
        if word in freqTable:
            freqTable[word] += 1
        else:
            freqTable[word] = 1
    return freqTable


def sentenceTokenize(text):
    sentences = sent_tokenize(text)
    return sentences


def generateRankSentencesTable(text):
    sentenceValue = dict()
    freqTable = generateFreqTable(text)
    sentences = sentenceTokenize(text)

    for sentence in sentences:
        for word, freq in freqTable.items():
            if word in sentence.lower():
                if sentence in sentenceValue:
                    sentenceValue[sentence] += freq
                else:
                    sentenceValue[sentence] = freq

    return sentenceValue


def summary(text):
    sum = 0
    sentenceValue = generateRankSentencesTable(text)
    for sentence in sentenceValue:
        sum += sentenceValue[sentence]
    avg = int(sum / len(sentenceValue))
    summary = ""
    sentences = sentenceTokenize(text)
    for sentence in sentences:
        if (sentence in sentenceValue) and (sentenceValue[sentence]
                                            > (1.2 * avg)):
            summary += " " + sentence

    return summary


def main_nltk(inp_text):
    # inp_text=input("Enter the text to be summarized: ")

    if ("**" not in inp_text):
        text = inp_text
    else:
        cleaned_text = clean(inp_text)
        text = cleaned_text
    summary_text = summary(text)
    main_summary = "\n\nMain Points:\n"
    for i, sentence in enumerate(summary_text.split(".")):
        if sentence.strip() != "":
            main_summary += f"\n{i+1}. {sentence.strip()}."

    print("\nModel Summary: ", main_summary)

    return main_summary
