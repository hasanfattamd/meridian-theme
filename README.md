# Meridian

Meridian is a TypeScript-based design system. Its first consumer is a VS Code theme generator.

## Architecture

This repository is intentionally designed to be simple and beginner-friendly:
- `src/tokens/`: Core design tokens (colors, typography, spacing).
- `src/mappings/`: Mappings of tokens to specific consumer targets.
- `src/generator/`: The theme generator implementation.
- `src/utils/`: Shared utilities.

## Getting Started

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Generate theme:
   ```bash
   pnpm run generate
   ```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
