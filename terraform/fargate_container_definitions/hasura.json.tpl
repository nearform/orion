[
  {
    "cpu": ${fargate_cpu},
    "image": "${app_image}",
    "memory": ${fargate_memory},
    "name": "${app_name}",
    "networkMode": "awsvpc",
    "portMappings": [
      {
        "containerPort": ${app_port},
        "hostPort": ${app_port}
      }
    ],
    "environment": [
      {
        "name": "HASURA_GRAPHQL_DATABASE_URL",
        "value": "${HASURA_GRAPHQL_DATABASE_URL}"
      },
      {
        "name": "HASURA_GRAPHQL_ADMIN_SECRET",
        "value": "${HASURA_GRAPHQL_ADMIN_SECRET}"
      },
      {
        "name": "HASURA_GRAPHQL_ENABLE_CONSOLE",
        "value": "${HASURA_GRAPHQL_ENABLE_CONSOLE}"
      },
      {
        "name": "HASURA_GRAPHQL_JWT_SECRET",
        "value": "${HASURA_GRAPHQL_JWT_SECRET}"
      },
      {
        "name": "HASURA_GRAPHQL_ENABLE_TELEMETRY",
        "value": "${HASURA_GRAPHQL_ENABLE_TELEMETRY}"
      },
      {
        "name": "HASURA_GRAPHQL_UNAUTHORIZED_ROLE",
        "value": "${HASURA_GRAPHQL_UNAUTHORIZED_ROLE}"
      }
    ],
    "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/${app_name}",
          "awslogs-region": "${aws_region}",
          "awslogs-stream-prefix": "ecs"
        }
    }
  }
]
