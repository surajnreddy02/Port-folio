// Jest setup for React + TypeScript
require('@testing-library/jest-dom');
// Mock IntersectionObserver for JSDOM
global.IntersectionObserver = class {
	constructor() {}
	observe() {}
	disconnect() {}
	unobserve() {}
};

// Mock GSAP for Jest (avoid ESM import errors)
jest.mock('gsap', () => ({
	registerPlugin: jest.fn(),
	utils: { toArray: jest.fn(() => []) },
	context: jest.fn(() => ({ revert: jest.fn() })),
	fromTo: jest.fn(),
}));
jest.mock('gsap/ScrollTrigger', () => ({}));

// Mock PDF.js for Jest (avoid initialization errors)
jest.mock('pdfjs-dist', () => ({
	GlobalWorkerOptions: { workerSrc: '' },
	version: 'mock',
}));
