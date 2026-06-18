.PHONY: help build build-no-cache up down restart logs shell local-build local-up local-down local-restart local-logs local-shell lint typecheck

ENV_FILE ?= .env.production
ENV_FILE_PATH ?= $(ENV_FILE)
COMPOSE_ENV_FILE := $(shell test -f $(ENV_FILE) && printf -- '--env-file $(ENV_FILE)')
COMPOSE := ENV_FILE_PATH=$(ENV_FILE_PATH) docker compose $(COMPOSE_ENV_FILE)
LOCAL_COMPOSE := docker compose -f docker-compose.local.yml

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

build: ## Build production docker image
	$(COMPOSE) build

build-no-cache: ## Build production docker image from scratch
	$(COMPOSE) build --no-cache

up: ## Start production container behind external Traefik
	$(COMPOSE) up -d

down: ## Stop production container
	$(COMPOSE) down

restart: ## Restart production container
	$(COMPOSE) restart dashboard

logs: ## Tail production container logs
	$(COMPOSE) logs -f dashboard

shell: ## Access production container shell
	$(COMPOSE) exec dashboard sh

local-build: ## Build local docker image
	$(LOCAL_COMPOSE) build

local-up: ## Start local container on http://localhost:3000
	$(LOCAL_COMPOSE) up -d

local-down: ## Stop local container
	$(LOCAL_COMPOSE) down

local-restart: ## Restart local container
	$(LOCAL_COMPOSE) restart dashboard

local-logs: ## Tail local container logs
	$(LOCAL_COMPOSE) logs -f dashboard

local-shell: ## Access local container shell
	$(LOCAL_COMPOSE) exec dashboard sh

lint: ## Run ESLint
	npm run lint

typecheck: ## Run TypeScript typecheck
	npm run typecheck
