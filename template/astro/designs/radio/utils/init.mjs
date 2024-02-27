import { logger } from "./logger.mjs";
import { runCli } from "./cli.mjs";
import { createEntry, createArticle } from "./create.mjs";

const main = async () => {
    const { story, category } = await runCli();
    createEntry(category, story);
    createArticle(category, story);
}

main().catch((err) => {
    logger.error("Aborting installation...");
    if (err instanceof Error) {
        logger.error(err);
    }
    else {
        logger.error("An unknown error has occurred. Please open an issue on github with the below:");
        console.log(err);
    }
    process.exit(1);
});
