import json
import pandas as pd
import os

cwd = os.getcwd()


json_files = [file for file in os.listdir(cwd) if file.endswith('.json')]


df_dict = {}


for json_file in json_files:
    with open(json_file, 'r', encoding='utf-8') as file:
        data = json.load(file)
        # Extract the key (title) from the JSON file
        key = list(data.keys())[0]
        df = pd.DataFrame(data[key])
        df.set_index('id', inplace=True)
        df_dict[key] = df

df_comments = df_dict.get('comments', pd.DataFrame())
df_dislikes = df_dict.get('dislikes', pd.DataFrame())
df_likes = df_dict.get('likes',pd.DataFrame())
df_posts = df_dict.get('posts',pd.DataFrame())
df_users = df_dict.get('users',pd.DataFrame())