import type { ExtensionAPI, ExtensionContext, ExtensionEvent, ToolDefinition, RegisteredCommand } from "@mariozechner/pi-coding-agent";
import type { TSchema } from "@sinclair/typebox";

export type CommandConfig = Omit<RegisteredCommand, "name" | "sourceInfo">;

export class PiExtension {
  constructor(public readonly api: ExtensionAPI) {}

  on<E extends ExtensionEvent["type"]>(event: E, handler: any) {
    this.api.on(event as any, handler);
    return this;
  }

  command(name: string, description: string, handler: (args: string, ctx: any) => Promise<void>) {
    this.api.registerCommand(name, {
      description,
      handler: async (args, ctx) => {
        try {
          await handler(args, ctx);
        } catch (error) {
          ctx.ui.notify(`Command /${name} failed: ${error instanceof Error ? error.message : String(error)}`, "error");
          console.error(`Error in command /${name}:`, error);
        }
      }
    });
    return this;
  }

  registerCommand(name: string, options: { description?: string; handler: (args: string, ctx: any) => Promise<void>; getArgumentCompletions?: any }) {
    this.api.registerCommand(name, options);
    return this;
  }

  registerTool<TParams extends TSchema, TDetails = unknown>(tool: ToolDefinition<TParams, TDetails>) {
    this.api.registerTool(tool);
    return this;
  }

  tool<TParams extends TSchema, TDetails = unknown>(tool: ToolDefinition<TParams, TDetails>) {
    return this.registerTool(tool);
  }

  registerShortcut(shortcut: any, options: { description?: string; handler: (ctx: any) => Promise<void> | void }) {
    this.api.registerShortcut(shortcut, options);
    return this;
  }

  registerFlag(name: string, options: { description?: string; type: "boolean" | "string"; default?: boolean | string }) {
    this.api.registerFlag(name, options);
    return this;
  }

  registerMessageRenderer<T = unknown>(customType: string, renderer: any) {
    this.api.registerMessageRenderer(customType, renderer);
    return this;
  }

  registerProvider(name: string, config: any) {
    this.api.registerProvider(name, config);
    return this;
  }

  sendMessage<T = unknown>(message: { customType: string; content: any; display: boolean; details?: T }, options?: { triggerTurn?: boolean; deliverAs?: "steer" | "followUp" | "nextTurn" }) {
    this.api.sendMessage(message, options);
    return this;
  }

  sendUserMessage(content: string | any[], options?: { deliverAs?: "steer" | "followUp" }) {
    this.api.sendUserMessage(content, options);
    return this;
  }

  appendEntry<T = unknown>(customType: string, data?: T) {
    this.api.appendEntry(customType, data);
    return this;
  }

  setSessionName(name: string) {
    this.api.setSessionName(name);
    return this;
  }

  getSessionName(): string | undefined {
    return this.api.getSessionName();
  }

  setLabel(entryId: string, label: string | undefined) {
    this.api.setLabel(entryId, label);
    return this;
  }

  exec(command: string, args?: string[], options?: any): Promise<any> {
    return this.api.exec(command, args || [], options);
  }

  getActiveTools(): string[] {
    return this.api.getActiveTools();
  }

  getAllTools(): any[] {
    return this.api.getAllTools();
  }

  setActiveTools(toolNames: string[]) {
    this.api.setActiveTools(toolNames);
    return this;
  }

  getCommands(): any[] {
    return this.api.getCommands();
  }

  setModel(model: any): Promise<boolean> {
    return this.api.setModel(model);
  }

  getThinkingLevel(): any {
    return this.api.getThinkingLevel();
  }

  setThinkingLevel(level: any) {
    this.api.setThinkingLevel(level);
    return this;
  }

  getFlag(name: string): boolean | string | undefined {
    return this.api.getFlag(name);
  }

  unregisterProvider(name: string) {
    this.api.unregisterProvider(name);
    return this;
  }

  get events() {
    return this.api.events;
  }

  log(message: string, ctx: ExtensionContext, type: "info" | "warning" | "error" = "info") {
    ctx.ui.notify(message, type);
    if (type === "error") {
      console.error(`[Extension] ${message}`);
    } else {
      console.log(`[Extension] ${message}`);
    }
  }
}