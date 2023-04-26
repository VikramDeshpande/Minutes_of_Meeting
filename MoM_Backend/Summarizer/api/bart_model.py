import json
import re
import torch
from transformers import BartTokenizer, BartForConditionalGeneration

def main_bart(conversation, summary_length):
  
  tokenizer = BartTokenizer.from_pretrained('facebook/bart-large-cnn')
  model = BartForConditionalGeneration.from_pretrained('facebook/bart-large-cnn')

  desired_length = min(summary_length, len(conversation.split())/3)
     
  # people = set([name.strip() for name in re.findall("([A-Z][a-z]*):", conversation)])

  # print("The following people were found in the conversation:")
  # print(", ".join(people))
  # name = input(f"Which person's pronoun would you like to template? Choose from {', '.join(people)}: ")

  # pronoun = "he/she" if re.search(f"{name}:", conversation).group(0)[0] == "H" else "him/her"

  # conversation = re.sub(f"{name}:", pronoun, conversation)

  max_length = int(desired_length * 1.2) 
  min_length = int(desired_length * 0.9) 
  summary_ids = model.generate(tokenizer.encode(conversation, truncation=True, return_tensors='pt'), max_length=max_length, min_length=min_length, num_beams=4, no_repeat_ngram_size=2, early_stopping=True)
  summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)

  # summary = re.sub(f"{pronoun}", name, summary)

  main_summary = "\n\nMain Points:\n"
  for i, sentence in enumerate(summary.split(".")):
      if sentence.strip() != "":
          main_summary += f"\n{i+1}. {sentence.strip()}."

  intro_length = min(int(len(summary) * 0.3), desired_length) 
  intro_ids = model.generate(tokenizer.encode(summary, truncation=True, return_tensors='pt'), max_length=intro_length, num_beams=2, no_repeat_ngram_size=2, early_stopping=True)
  intro_text = tokenizer.decode(intro_ids[0], skip_special_tokens=True)


  main_points = main_summary

  output_text = f"\nIntro:\n{intro_text}{main_points}\n"
  print(output_text)
  return output_text


