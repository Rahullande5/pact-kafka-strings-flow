
import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Folder, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TreeNode {
  name: string;
  isFolder: boolean;
  children?: TreeNode[];
}

interface TreeViewProps {
  data: TreeNode;
  level?: number;
}

const TreeNode: React.FC<TreeViewProps> = ({ data, level = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(level < 1);
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const renderIcon = () => {
    if (data.isFolder) {
      return isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />;
    }
    return null;
  };

  const renderFileOrFolderIcon = () => {
    if (data.isFolder) {
      return <Folder size={16} className="text-yellow-500" />;
    }
    return <FileText size={16} className="text-blue-500" />;
  };

  return (
    <div>
      <div 
        className={cn(
          "flex items-center py-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800",
          data.isFolder ? "font-medium" : ""
        )}
        style={{ paddingLeft: `${level * 16}px` }}
        onClick={data.isFolder ? toggleExpand : undefined}
      >
        <span className="mr-1">{renderIcon()}</span>
        <span className="mr-1">{renderFileOrFolderIcon()}</span>
        <span>{data.name}</span>
      </div>
      
      {isExpanded && data.children && (
        <div>
          {data.children.map((child, index) => (
            <TreeNode key={`${child.name}-${index}`} data={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const ProjectStructure = () => {
  const projectStructure: TreeNode = {
    name: "spring-kafka-pact-demo",
    isFolder: true,
    children: [
      {
        name: "src",
        isFolder: true,
        children: [
          {
            name: "main",
            isFolder: true,
            children: [
              {
                name: "java/com/example/demo",
                isFolder: true,
                children: [
                  { name: "KafkaPactApplication.java", isFolder: false },
                  { name: "config", isFolder: true, children: [
                    { name: "KafkaConfig.java", isFolder: false }
                  ]},
                  { name: "listener", isFolder: true, children: [
                    { name: "MessageListener.java", isFolder: false }
                  ]},
                  { name: "model", isFolder: true, children: [
                    { name: "Message.java", isFolder: false }
                  ]},
                  { name: "service", isFolder: true, children: [
                    { name: "MessageService.java", isFolder: false },
                    { name: "MessageServiceImpl.java", isFolder: false }
                  ]}
                ]
              },
              {
                name: "resources",
                isFolder: true,
                children: [
                  { name: "application.yml", isFolder: false },
                  { name: "application-test.yml", isFolder: false }
                ]
              }
            ]
          },
          {
            name: "test",
            isFolder: true,
            children: [
              {
                name: "java/com/example/demo",
                isFolder: true,
                children: [
                  { name: "pact", isFolder: true, children: [
                    { name: "consumer", isFolder: true, children: [
                      { name: "MessageConsumerPactTest.java", isFolder: false }
                    ]},
                    { name: "provider", isFolder: true, children: [
                      { name: "MessageProviderPactTest.java", isFolder: false }
                    ]}
                  ]},
                  { name: "listener", isFolder: true, children: [
                    { name: "MessageListenerTest.java", isFolder: false }
                  ]}
                ]
              },
              {
                name: "resources",
                isFolder: true,
                children: [
                  { name: "pacts", isFolder: true, children: [
                    { name: "message-consumer-message-provider.json", isFolder: false }
                  ]}
                ]
              }
            ]
          }
        ]
      },
      {
        name: "pom.xml",
        isFolder: false
      },
      {
        name: "README.md",
        isFolder: false
      }
    ]
  };

  return (
    <div className="border rounded-lg p-4 bg-white dark:bg-gray-900 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Project Structure</h3>
      <div className="font-mono text-sm">
        <TreeNode data={projectStructure} />
      </div>
    </div>
  );
};

export default ProjectStructure;
