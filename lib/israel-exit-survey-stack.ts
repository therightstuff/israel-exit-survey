import { Stack, StackProps } from 'aws-cdk-lib';
import { BackupPlan, BackupPlanRule, BackupResource } from 'aws-cdk-lib/aws-backup';
import { Construct } from 'constructs';
import { StaticWebsite } from './static-website';

export class IsraelExitSurveyStack extends Stack {

  constructor(scope: Construct, id: string, props?: StackProps, customOptions?: any) {
    super(scope, id, props);

    const stack = this;
    customOptions = customOptions || {};

    let backupPlan;
    if (!customOptions.disableDdbBackup) {
        backupPlan = new BackupPlan(this, `${id}-daily-weekly-monthly`);
        backupPlan.addRule(BackupPlanRule.daily());
        backupPlan.addRule(BackupPlanRule.weekly());
        backupPlan.addRule(BackupPlanRule.monthly1Year());
        backupPlan.addSelection('Selection', {
          resources: [
            BackupResource.fromTag('stack-name', id),
          ]
        });
    }

    const staticWebsite = new StaticWebsite(stack);

  }
}
