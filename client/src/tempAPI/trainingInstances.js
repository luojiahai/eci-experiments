var trainingInstances = [
    {
        instance: {
            subject: [1, 6, 9, 2, 10, 0, 4, 1, 0, 39, 0],
            fact: [0, 6, 9, 2, 10, 0, 4, 1, 0, 39, 0],
            contrast: [2, 5, 10, 2, 10, 0, 4, 1, 2, 39, 1]
        }
    },
    {
        instance: {
            subject: [1, 4, 11, 2, 12, 2, 4, 0, 2, 39, 0],
            fact: [1, 4, 11, 2, 11, 3, 4, 0, 2, 39, 0],
            contrast: [2, 4, 11, 2, 12, 0, 4, 1, 2, 39, 1]
        }
    },
    {
        instance: {
            subject: [0, 4, 11, 3, 3, 0, 4, 1, 0, 39, 0],
            fact: [0, 4, 11, 2, 3, 0, 4, 1, 0, 39, 0],
            contrast: [2, 2, 11, 2, 3, 0, 4, 1, 2, 39, 1]
        }
    },
    {
        instance: {
            subject: [1, 4, 15, 6, 14, 2, 4, 1, 0, 39, 0],
            fact: [0, 4, 15, 6, 14, 1, 4, 0, 0, 39, 0],
            contrast: [2, 4, 15, 4, 12, 0, 4, 1, 2, 39, 1]
        }
    },
    {
        instance: {
            subject: [2, 5, 9, 4, 1, 0, 4, 1, 0, 39, 0],
            fact: [2, 4, 9, 4, 1, 0, 4, 1, 0, 39, 0],
            contrast: [3, 4, 8, 4, 1, 0, 4, 1, 2, 39, 1]
        }
    },
    {
        instance: {
            subject: [1, 4, 8, 4, 5, 0, 4, 0, 0, 39, 0],
            fact: [1, 4, 8, 4, 5, 1, 4, 0, 0, 39, 0],
            contrast: [2, 4, 9, 4, 4, 0, 4, 1, 2, 39, 1]
        }
    },
    {
        instance: {
            subject: [0, 2, 12, 4, 8, 0, 4, 1, 0, 39, 0],
            fact: [0, 1, 11, 4, 8, 1, 4, 1, 0, 39, 0],
            contrast: [1, 1, 11, 2, 8, 0, 4, 1, 2, 39, 1]
        }
    },
    {
        instance: {
            subject: [3, 2, 7, 4, 10, 4, 0, 1, 1, 39, 0],
            fact: [3, 1, 9, 5, 10, 4, 1, 0, 0, 39, 0],
            contrast: [2, 4, 8, 2, 10, 0, 1, 1, 2, 39, 1]
        }
    },
    {
        instance: {
            subject: [2, 4, 11, 2, 7, 0, 2, 1, 1, 39, 0],
            fact: [2, 4, 11, 2, 7, 0, 1, 1, 0, 39, 0],
            contrast: [2, 4, 12, 2, 8, 0, 4, 1, 2, 39, 1]
        }
    },
    {
        instance: {
            subject: [2, 2, 11, 0, 1, 1, 4, 1, 2, 39, 0],
            fact: [0, 2, 11, 0, 1, 1, 4, 0, 1, 39, 0],
            contrast: [2, 2, 11, 2, 3, 0, 4, 1, 2, 39, 1]
        }
    },
    // {
    //     instance: {
    //         subject: [0, 7, 15, 5, 7, 0, 4, 0, 1, 39, 0],
    //         fact: [0, 6, 15, 4, 6, 0, 4, 1, 0, 39, 0],
    //         contrast: [2, 4, 15, 4, 8, 0, 4, 1, 2, 39, 1]
    //     }
    // },
    // {
    //     instance: {
    //         subject: [3, 4, 11, 4, 6, 2, 4, 1, 0, 39, 0],
    //         fact: [3, 4, 11, 4, 6, 1, 4, 0, 0, 39, 0],
    //         contrast: [3, 4, 12, 2, 7, 0, 4, 1, 2, 39, 1]
    //     }
    // },
    // {
    //     instance: {
    //         subject: [0, 0, 11, 2, 12, 1, 1, 1, 0, 39, 0],
    //         fact: [0, 0, 11, 2, 10, 1, 2, 1, 0, 39, 0],
    //         contrast: [2, 1, 12, 2, 12, 0, 4, 1, 2, 39, 1]
    //     }
    // },
    // {
    //     instance: {
    //         subject: [2, 4, 15, 2, 3, 1, 4, 1, 0, 39, 0],
    //         fact: [2, 4, 15, 2, 3, 1, 4, 1, 0, 39, 0],
    //         contrast: [3, 4, 15, 2, 4, 0, 4, 1, 2, 39, 1]
    //     }
    // },
    // {
    //     instance: {
    //         subject: [1, 4, 15, 2, 6, 0, 4, 1, 0, 39, 0],
    //         fact: [0, 4, 15, 2, 6, 0, 4, 1, 0, 39, 0],
    //         contrast: [3, 4, 15, 2, 7, 0, 4, 1, 1, 39, 1]
    //     }
    // },
    // {
    //     instance: {
    //         subject: [0, 4, 11, 2, 8, 0, 4, 1, 2, 39, 0],
    //         fact: [0, 4, 11, 2, 8, 0, 4, 1, 2, 39, 0],
    //         contrast: [1, 4, 11, 2, 8, 0, 4, 1, 2, 39, 1]
    //     }
    // },
    // {
    //     instance: {
    //         subject: [0, 4, 10, 4, 14, 0, 4, 0, 2, 39, 0],
    //         fact: [0, 4, 11, 4, 14, 0, 4, 1, 2, 39, 0],
    //         contrast: [1, 4, 11, 2, 12, 0, 4, 1, 2, 39, 1]
    //     }
    // },
    // {
    //     instance: {
    //         subject: [3, 4, 8, 2, 8, 1, 4, 1, 2, 39, 1],
    //         fact: [3, 4, 9, 2, 8, 0, 4, 1, 2, 39, 1],
    //         contrast: [3, 4, 7, 2, 8, 1, 4, 1, 1, 39, 0]
    //     }
    // },
    // {
    //     instance: {
    //         subject: [0, 4, 12, 4, 10, 0, 4, 0, 1, 39, 0],
    //         fact: [0, 4, 11, 4, 10, 0, 4, 0, 0, 39, 0],
    //         contrast: [1, 4, 11, 4, 10, 0, 4, 1, 2, 39, 1]
    //     }
    // },
    // {
    //     instance: {
    //         subject: [2, 4, 9, 0, 1, 0, 4, 1, 0, 39, 0],
    //         fact: [1, 4, 9, 0, 1, 0, 4, 0, 0, 39, 0],
    //         contrast: [2, 4, 9, 2, 1, 0, 4, 1, 2, 39, 1]
    //     }
    // },
    // {
    //     instance: {
    //         subject: [0, 4, 12, 4, 14, 1, 2, 0, 0, 39, 0],
    //         fact: [0, 4, 14, 4, 14, 0, 2, 0, 0, 39, 0],
    //         contrast: [2, 4, 12, 4, 12, 0, 4, 1, 2, 39, 1]
    //     }
    // },
    // {
    //     instance: {
    //         subject: [2, 4, 15, 4, 7, 0, 4, 1, 2, 39, 1],
    //         fact: [3, 4, 15, 4, 6, 0, 4, 1, 2, 39, 1],
    //         contrast: [2, 4, 15, 4, 6, 1, 4, 0, 2, 39, 0]
    //     }
    // },
    // {
    //     instance: {
    //         subject: [1, 2, 11, 4, 3, 2, 4, 0, 0, 39, 0],
    //         fact: [0, 2, 11, 4, 3, 1, 4, 1, 0, 39, 0],
    //         contrast: [2, 1, 11, 4, 4, 1, 4, 1, 2, 39, 1]
    //     }
    // },
    // {
    //     instance: {
    //         subject: [1, 2, 8, 4, 8, 0, 4, 1, 0, 39, 0],
    //         fact: [1, 2, 7, 4, 7, 0, 4, 0, 0, 39, 0],
    //         contrast: [2, 2, 9, 4, 7, 0, 4, 1, 2, 39, 1]
    //     }
    // },
    // {
    //     instance: {
    //         subject: [3, 4, 15, 2, 12, 2, 4, 0, 2, 39, 0],
    //         fact: [2, 4, 15, 2, 13, 2, 4, 1, 1, 39, 0],
    //         contrast: [3, 4, 14, 2, 12, 0, 4, 1, 2, 39, 1]
    //     }
    // },
    // {
    //     instance: {
    //         subject: [0, 5, 9, 2, 4, 0, 2, 1, 0, 39, 0],
    //         fact: [0, 4, 11, 2, 4, 0, 2, 1, 0, 39, 0],
    //         contrast: [2, 4, 9, 2, 4, 0, 2, 1, 2, 39, 1]
    //     }
    // },
    // {
    //     instance: {
    //         subject: [0, 6, 12, 2, 4, 0, 4, 1, 0, 39, 0],
    //         fact: [0, 6, 11, 2, 4, 0, 4, 1, 0, 39, 0],
    //         contrast: [3, 4, 12, 2, 4, 0, 4, 1, 2, 39, 1]
    //     }
    // }
]

export default trainingInstances;