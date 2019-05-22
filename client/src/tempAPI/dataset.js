var dataset = {
    classNames: [
        '<=50K', 
        '>50K'
    ],
    attributeNames: [
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
    categoricalNames: [
        [
            'Age <= 28.00',
            '28.00 < Age <= 37.00',
            '37.00 < Age <= 48.00',
            'Age > 48.00'
        ],
        [
            '?', 'Federal-gov', 'Local-gov', 'Never-worked', 'Private',
            'Self-emp-inc', 'Self-emp-not-inc', 'State-gov', 'Without-pay'
        ],
        [
            '10th', '11th', '12th', '1st-4th', '5th-6th', '7th-8th',
            '9th', 'Assoc-acdm', 'Assoc-voc', 'Bachelors', 'Doctorate',
            'HS-grad', 'Masters', 'Preschool', 'Prof-school',
            'Some-college'
        ],
        [
            'Divorced', 'Married-AF-spouse', 'Married-civ-spouse',
            'Married-spouse-absent', 'Never-married', 'Separated',
            'Widowed'
        ],
        [
            '?', 'Adm-clerical', 'Armed-Forces', 'Craft-repair',
            'Exec-managerial', 'Farming-fishing', 'Handlers-cleaners',
            'Machine-op-inspct', 'Other-service', 'Priv-house-serv',
            'Prof-specialty', 'Protective-serv', 'Sales', 'Tech-support',
            'Transport-moving'
        ],
        [
            'Husband', 'Not-in-family', 'Other-relative', 'Own-child',
            'Unmarried', 'Wife'
        ],
        [
            'Amer-Indian-Eskimo', 'Asian-Pac-Islander', 'Black', 'Other',
            'White'
        ],
        [
            'Female', 'Male'
        ],
        [
            'Hours per week <= 40.00',
            '40.00 < Hours per week <= 45.00',
            'Hours per week > 45.00'
        ],
        [
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
    ]

}

export default dataset;