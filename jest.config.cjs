module.exports = {
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs'],
	moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
	transform: {
		'^.+\\.(js|jsx|ts|tsx)$': [
			'ts-jest',
			{
				tsconfig: '<rootDir>/tsconfig.app.json',
			},
		],
	},
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
		'\\.(css|less|scss|sass)$': 'identity-obj-proxy',
		'\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.cjs',
	},
};
