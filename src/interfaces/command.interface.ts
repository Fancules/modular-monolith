interface ICommand<TCommandPayload> extends IModule{
    type: string;
    handler: (payload: TCommandPayload) => void;
}