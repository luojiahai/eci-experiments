var dataset = {
    class_names: [
        '<=50K', 
        '>50K'
    ],
    attribute_names: [
        'Age',
        'Workclass',
        'Education',
        'Marital Status',
        'Occupation',
        'Relationship',
        'Race',
        'Sex',
        'Hours per week',
        'Native Country'
    ],
    categorical_names: {
        0: [
            'Age <= 28.00',
            '28.00 < Age <= 37.00',
            '37.00 < Age <= 48.00',
            'Age > 48.00'
        ],
        1: [
            '?', 'Federal-gov', 'Local-gov', 'Never-worked', 'Private',
            'Self-emp-inc', 'Self-emp-not-inc', 'State-gov', 'Without-pay'
        ],
        2: [
            '10th', '11th', '12th', '1st-4th', '5th-6th', '7th-8th',
            '9th', 'Assoc-acdm', 'Assoc-voc', 'Bachelors', 'Doctorate',
            'HS-grad', 'Masters', 'Preschool', 'Prof-school',
            'Some-college'
        ],
        3: [
            'Divorced', 'Married-AF-spouse', 'Married-civ-spouse',
            'Married-spouse-absent', 'Never-married', 'Separated',
            'Widowed'
        ],
        4: [
            '?', 'Adm-clerical', 'Armed-Forces', 'Craft-repair',
            'Exec-managerial', 'Farming-fishing', 'Handlers-cleaners',
            'Machine-op-inspct', 'Other-service', 'Priv-house-serv',
            'Prof-specialty', 'Protective-serv', 'Sales', 'Tech-support',
            'Transport-moving'
        ],
        5: [
            'Husband', 'Not-in-family', 'Other-relative', 'Own-child',
            'Unmarried', 'Wife'
        ],
        6: [
            'Amer-Indian-Eskimo', 'Asian-Pac-Islander', 'Black', 'Other',
            'White'
        ],
        7: [
            'Female', 'Male'
        ],
        8: [
            'Hours per week <= 40.00',
            '40.00 < Hours per week <= 45.00',
            'Hours per week > 45.00'
        ],
        9: [
            '?', 'Cambodia', 'Canada', 'China', 'Columbia', 'Cuba',
            'Dominican-Republic', 'Ecuador', 'El-Salvador', 'England',
            'France', 'Germany', 'Greece', 'Guatemala', 'Haiti',
            'Holand-Netherlands', 'Honduras', 'Hong', 'Hungary', 'India',
            'Iran', 'Ireland', 'Italy', 'Jamaica', 'Japan', 'Laos',
            'Mexico', 'Nicaragua', 'Outlying-US(Guam-USVI-etc)', 'Peru',
            'Philippines', 'Poland', 'Portugal', 'Puerto-Rico',
            'Scotland', 'South', 'Taiwan', 'Thailand', 'Trinadad&Tobago',
            'United-States', 'Vietnam', 'Yugoslavia'
        ]
    }

}

export default dataset;