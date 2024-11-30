# Dem Imports
import pandas as pd
from scipy import stats
import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np
from statsmodels.stats.diagnostic import het_breuschpagan
from statsmodels.stats.diagnostic import het_white
import statsmodels.api as sm
from statsmodels.formula.api import ols
from statsmodels.stats.multicomp import pairwise_tukeyhsd
from datetime import datetime

'''Univariate'''
# df.describe()
# df.dtypes
# pd.api.types.is_numeric_dtype(df.c1)
# df.count()
# df.nunique()
# df.c1.unique()
# df.isna().sum()
# df.shape
# df.mean()
# df.median()
# df.mode()
# df.min()
# df.max()
# df.quantile(0.##)
# df.std()
# df.skew()

'''histplot'''
# sns.histplot(df, x = 'c1', hue='c2')
# plt.title('c1name')
# plt.show()

'''Pivot table'''
# df.pivot_table(index = "c1", values = "c2", aggfunc="mean or another function").sort_values("c2", ascending=True)



''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

'''correlation r and p test'''
''' NN '''
# r, p = stats.pearsonr(df.c1, df.c2)
# print('r: ' + str(round(r, 4)))
# print('p-value:' + str(round(p, 4)))

'''linear regression'''
''' NN '''
# model = np.polyfit(df.c1, df.c2, 1)
# print('y = ' + str(round(model[0], 3)) + 'x +' + str(round(model[1], 3)))

'''r-squared'''
''' NN '''
# r, p = stats.pearsonr(df.c1, df.c2)

# r2 = r ** 2
# r2

'''scatterplot'''
''' NN '''
# sns.scatterplot(x = df.Acceleration, y = df.MPG)
# plt.show()

'''linear model plot'''
''' NN '''
# sns.lmplot(x ='c1', y ='c2', data = df)
# plt.show()

''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

'''T-test'''
''' NC '''
# data1 = df[df['c1'] == 'value1']
# data2 = df[df['c1'] == 'value2']

# t, p = stats.ttest_ind(data1.c2, data2.c2)
# print("t: " + str(round(t, 3)))
# print("p: " + str(round(p, 3)))

'''ANOVA'''
''' NC '''
# groups = df['c1'].unique()  #Filter all the unique group names
# group_labels = []               #Create an empty list that will be a two-dimensional list of lists to store the label values associated with a category
# for g in groups:                  #Loop through each unique group name
#   group_labels.append(df[df.c1 == g]['c2'])  #add to the group_labels list the numeric value for the group name

'''Tukey's T-test'''
''' NC '''
# tukey = pairwise_tukeyhsd(endog=df['charges'],
#                           groups=df['region'],
#                           alpha=0.05)
# print(tukey)

'''Bar Plot'''
''' NC '''
# sns.barplot(x = 'c1', y = 'c2', hue = 'c3', data = df)

# plt.title('c1 by c2 and c3')
# plt.show()

''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

'''Observed counts'''
''' CC '''
# crosstab = pd.crosstab(index = df['c1'], columns = df['c2'], margins = True)

# plt.title('Observed Counts of c1 per c2')

# sns.heatmap(crosstab, annot=True, fmt='d', cmap='coolwarm')

# plt.show()

'''Expected counts'''
''' CC '''
# # 1 - Create a crosstab with the observed counts (like we did above)
# crosstab = pd.crosstab(index = df['c1'], columns = df['c2'], margins = True)

# # 2 - Pass the observed crosstab to the chi2_contingency
# # This returns 4 values: the chi-square, p-value, degrees of freedom, and expected values
# # We will use the chi-square and p-value later. Now we just need the expected values
# x, p, dof, expected_values = chi2_contingency(crosstab) # type: ignore

# # 3 - Create a dataframe with the expected values
# ex_df = pd.DataFrame(np.rint(expected_values).astype('int64'), columns=crosstab.columns, index = crosstab.index )

# # 4 - Pass the expected values dataframe to a heatmap
# sns.heatmap(ex_df, annot=True,  fmt='d', cmap='coolwarm')

# # 5 - Add a title
# plt.title('Expected Values of c1 per c2')

# plt.show()

'''Chi-squared test'''
''' CC '''
# # 1 - generate the observed crosstab (just like above)
# crosstab = pd.crosstab(index = df['c1'], columns = df['c2'], margins = True)

# # 2 - pass the observed crosstab to the chi2_contingency (just like above)
# x, p, dof, expected_values = chi2_contingency(crosstab) # type: ignore

# print('chi-square: ' + str(round(x,4)))
# print('p-value: ' + str(round(p, 4)))